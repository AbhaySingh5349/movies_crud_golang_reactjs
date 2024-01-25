import { useNavigate } from 'react-router-dom';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as z from 'zod';

import { LoginSchema } from '../../types/validations';

import { LoginData } from '../../types';

const Login = () => {
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof LoginSchema>>({
    mode: 'onChange',
    resolver: zodResolver(LoginSchema),
  });

  const formSubmitHandler: SubmitHandler<z.infer<typeof LoginSchema>> = async (
    data: LoginData
  ) => {
    try {
      console.log(`Login successfull: ${data.email}`);
      alert(`Login successfull: ${data}`);
      reset();
      navigate('/');
    } catch (err) {
      alert(`Failed to login: ${err}`);
    }
  };

  function inputHeader(text: string) {
    return <h2 className="text-xl mt-4 text-primary-500">{text}</h2>;
  }

  return (
    <div className="grow flex flex-col justify-center">
      <h1 className="text-2xl text-center font-semibold text-primary-100 mb-4">
        Login
      </h1>
      <form
        className="mx-auto max-w-3xl relative grow"
        onSubmit={handleSubmit(formSubmitHandler)}
      >
        {inputHeader('Email')}
        <input
          type="email"
          placeholder="abc@email.com"
          {...register('email')}
          className="form-input"
        />
        {errors.email && (
          <span className="text-primary-error text-left">
            {errors.email.message}
          </span>
        )}
        {inputHeader('Password')}
        <input
          type="password"
          placeholder="password"
          {...register('password')}
          className="form-input"
        />
        {errors.password && (
          <span className="text-primary-error">{errors.password.message}</span>
        )}
        <button
          className="btn btn-primary w-1/2 mx-auto absolute left-1/2 transform -translate-x-1/2 mt-16"
          disabled={isSubmitting}
          type="submit"
        >
          {isSubmitting ? 'Loging-in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default Login;
