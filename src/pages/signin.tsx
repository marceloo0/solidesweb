import Link from 'next/link';
import { useRouter } from 'next/router';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

interface SignInFormData {
  email: string;
  password: string;
}

const initialValues: SignInFormData = {
  email: '',
  password: ''
}

export default function Signin() {
  const router = useRouter();

  const schema = Yup.object().shape({
    email: Yup.string()
      .required('E-mail obrigatório')
      .email('Digite um e-mail válido'),
    password: Yup.string().min(6, 'No mínimo 6 dígitos'),
  });

  async function onSubmit(values: SignInFormData, actions) {
    try {
      const user = await axios.post('http://localhost:3000/api/users/signin', values);
      
      console.log('ok')
      const name = user.data.name;

      alert(
        'Login efetuado com sucesso.'
      );
      router.push(`/registrar/${[name]}`);
    } catch (err) {
      alert(
        err?.response?.data?.error || 'Ocorreu um erro ao fazer cadastro, verifique seus dados.'
      );
    }
  }

  return (
    <div className="flex p-6 h-screen content-center justify-center bg-gray-50">
      <div className="flex flex-col space-y-4 h-auto content-center justify-center">
      <div className="max-w-md p-6">
        <div>
          <img className="mx-auto h-12 w-auto" src="/logo.svg" alt="logo" />
          <h2 className="mt-6 text-center text-2xl font-extrabold text-indigo-900 ">
            Faça seu login
          </h2>
        </div>
        <Formik
          validationSchema={schema}
          onSubmit={onSubmit}
          validateOnMount
          initialValues={initialValues}>
          {({ values, errors, touched, isValid }) => (
            <Form className="flex flex-col mt-8 space-y-6">
              <div className="flex flex-col">
                <div className="mt-1 relative rounded-md">
                  <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                    <svg className="stroke-current text-indigo-400 h-6 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <Field
                    className="py-2 text-lg px-4 pl-10 w-full border-2 border-transparent p-2 rounded-xl focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 hover:shadow"
                    type="text"
                    placeholder="E-mail"
                    name="email"
                  />
                </div>
                <div className="text-red-600">
                  <ErrorMessage
                    name="email"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <div className="mt-1 relative rounded-md">
                  <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                    <svg className="stroke-current text-indigo-400 h-6 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <Field
                    className="py-2 text-lg pl-10 w-full border-2 border-transparent rounded-xl px-4 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 hover:shadow"
                    type="password"
                    placeholder="Senha"
                    name="password"
                  />
                </div>
                <div className="text-red-600">
                  <ErrorMessage
                    name="password"
                  />
                </div>
              </div>
                <button className="bg-indigo-500 text-indigo-50 text-center px-6 py-3 text-lg font-semibold rounded-xl hover:bg-indigo-700 transition transform hover:scale-110 motion-reduce:transform-none"
                  type="submit" disabled={!isValid}
                >
                  Login
                </button>
              <Link href="/signup">
                <a className="text-gray-500 text-center hover:text-gray-700 hover:underline transition transform hover:scale-110 motion-reduce:transform-none">
                  Criar conta
                </a>
              </Link>
            </Form>
          )}
        </Formik>
        </div>
      </div>
    </div>
  );
}
