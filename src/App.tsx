import { LoginForm } from './components/LoginForm';

export const App = () => {
  return (
    <main className="m-16 flex justify-center">
      <div
        className={`
          flex max-w-3xl flex-1 flex-col items-center
          justify-center border-2 bg-slate-300 p-4`}
      >
        <h1>YouTube Form</h1>

        <LoginForm />
      </div>
    </main>
  );
};
