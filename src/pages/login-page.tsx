import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { z } from "zod";

import { loginAdmin } from "../features/auth/api";
import { useAuth } from "../features/auth/use-auth";
import { getApiErrorMessage } from "../lib/errors/api-error";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

type LoginValues = z.infer<typeof schema>;

export const LoginPage = () => {
  const navigate = useNavigate();
  const { saveToken } = useAuth();
  const { register, handleSubmit, formState } = useForm<LoginValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "admin@protectora.local",
      password: "Admin1234!",
    },
  });

  const mutation = useMutation({
    mutationFn: loginAdmin,
    onSuccess: (data) => {
      saveToken(data.data.token);
      toast.success("Login correcto.");
      navigate("/admin");
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });

  return (
    <section>
      <h1>Login admin</h1>
      <form className="form" onSubmit={handleSubmit((values) => mutation.mutate(values))}>
        <label className="field">
          Email
          <input type="email" autoComplete="username" {...register("email")} />
          <span className="error-text">{formState.errors.email?.message}</span>
        </label>
        <label className="field">
          Password
          <input type="password" autoComplete="current-password" {...register("password")} />
          <span className="error-text">{formState.errors.password?.message}</span>
        </label>
        <button disabled={mutation.isPending} type="submit">
          {mutation.isPending ? "Ingresando..." : "Entrar"}
        </button>
      </form>
    </section>
  );
};
