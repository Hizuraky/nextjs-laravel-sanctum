# next_laravel_sanctum
Nextjs + Laravel + Mysqlの開発環境テンプレート

Laravel sanctumの認証機能実装済

<br />

## **環境構築**

- NextjsをLocal、Laravel + MysqlをDockerにて開発　->　`$ make init`
- Nextjs + Laravel + MysqlをDockerにて開発　->　`$ make init-docker`

### **make init**
meke init の処理内容（make init-dockerもnextjsの起動をdockerかlocalかの違いのみです）
1. cp .env.example .env　->　ルートディレクトの.env.exampleから.env複製（DB接続情報と各コンテナport）
2. cp ./next/.env.example.local ./next/.env　->　nextjsの.env.example.localから.env複製（クライアントとサーバーサイドのエンドポイント）
3. docker-compose -f docker-compose.local.yml up -d --build　->　各コンテナビルド
4. docker-compose exec laravel composer install　->　laravel依存関係インストール
5. docker-compose exec laravel cp .env.example .env　->　laravelの.env.exampleから.env複製
6. docker-compose exec laravel php artisan key:generate　->　laravelのAPIキー作成
7. docker-compose exec laravel chmod -R 777 storage bootstrap/cache　->　laravelの権限変更（ログ出力など）
8.  @make cache　->　laravelのキャッシュクリア
9.  @make fresh　->　laravelのmigrationとseeding実行
10. cd next && yarn && yarn dev　->　nextjsの依存関係インストールしてローカルで起動



下記のコンテナ4つが立ち上がる(make initの場合はnextを除く3つ)。
<image src="https://hiz-pictures.s3.ap-northeast-1.amazonaws.com/NL-docker.png" />

<br />

## **Next.js**
- version : 13

<image src="https://hiz-pictures.s3.ap-northeast-1.amazonaws.com/next-sanctum.png" />

3つの画面を用意
- Login =>  DBに登録されているユーザー情報でログインできる画面
- Register => 新規にユーザーを登録できる
- User => 登録しているユーザー情報をGETし表示する画面
- 
ログイン状態の場合のみUser画面に遷移可能（Nextjsのmiddlewareにて制御）
### **Login**
- EmailとPasswordを入力してLoginボタン押下でログイン可能
- バリデーションは未実施

### **Register**
- NameとEmailとPasswordを入力してRegistrationボタン押下で新規登録可能
- バリデーションはサーバーサイドのみ実装済
- Name:必須, Email:必須でunique, pass:必須で英字+数字で8文字以上,
  
### **User**
- NameとEmailをAPIより取得し表示
- Logoutボタンでログアウト可能


<br />

## **Laravel**
- version : 9

デフォルトであるものとsanctum有効化に伴うAPI以外に4つのAPIを用意

```
/app # php artisan route:list

  GET|HEAD   /
  generated::LqeMzgRXBjBybN6D
  
  POST       _ignition/execute-solution
  ignition.executeSolution › Spatie\LaravelIgnition › ExecuteSolutionController
  
  GET|HEAD   _ignition/health-check
  ignition.healthCheck › Spatie\LaravelIgnition › HealthCheckController
  
  POST       _ignition/update-config
  ignition.updateConfig › Spatie\LaravelIgnition › UpdateConfigController
  
  POST       api/login
  login › AuthController@login
  
  POST       api/logout
  logout › AuthController@logout
  
  POST       api/register
  create › UserController@create
  
  GET|HEAD   api/user 
  index › UserController@index

  GET|HEAD   sanctum/csrf-cookie 
  sanctum.csrf-cookie › Laravel\Sanctum › CsrfCookieController@show

```