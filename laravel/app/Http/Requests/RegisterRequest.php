<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Validation\ValidationException;
use App\Rules\PasswordRule;
use App\Rules\EmailUniqueRule;
use App\Rules\EmailFormatRule;

class RegisterRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * ユーザー登録バリデーション
     *
     * @return array
     */
    public function rules()
    {
        $rules = [
            'name' => ['required','max:255'],
            'email' => ['required','max:254', new EmailUniqueRule, new EmailFormatRule],
            'password' => ['required', new PasswordRule],
        ];

        return $rules;
    }

    public function messages()
    {
        return [
            'required' => ':attributeは必須です。',
            'max' => ':attributeは:max文字以下で入力してください。',
        ];
    }

    public function attributes()
    {
        return [
            'name' => '名前',
            'email' => 'メールアドレス',
            'password' => 'パスワード',
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        throw new ValidationException($validator);
    }
}
