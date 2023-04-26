import styles from "../styles/Form.module.css";
import Layout from "@/layout/layout";
import login_validate from "@/lib/validate";
import { useFormik } from "formik";
import { signIn } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { HiAtSymbol, HiOutlineKey } from "react-icons/hi2";

export default function Login() {
  const [show, setShow] = useState(false);
  const router = useRouter();
  // formik hook
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: login_validate,
    onSubmit,
  });

  async function onSubmit(values) {
    const status = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
      callbackUrl: "/",
    });

    if (status.ok) router.push(status.url);
  }

  // Google Handler function
  async function handleGoogleSignin() {
    signIn("google", { callbackUrl: "http://localhost:3000" });
  }

  // Github Login
  async function handleGithubSignin() {
    signIn("github", { callbackUrl: "http://localhost:3000" });
  }

  return (
    <Layout>
      <Head>
        <title>Login</title>
      </Head>

      <section className="w-3/4 mx-auto flex flex-col gap-5">
        <div className="title">
          <h1 className="text-gray-800 text-4xl font-bold py-3">Explore</h1>
          <p className="mx-auto text-gray-400">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
        </div>

        {/* form */}
        <form className="flex flex-col gap-5" onSubmit={formik.handleSubmit}>
          <div
            className={`${styles.input_group} ${
              formik.errors.email && formik.touched.email
                ? "border-rose-600"
                : ""
            }`}
          >
            <input
              type="email"
              name="email"
              placeholder="Email"
              className={styles.input_text}
              {...formik.getFieldProps("email")}
            />
            <span className="icon flex items-center px-4">
              <HiAtSymbol size={25} />
            </span>
          </div>
          {/* {formik.errors.email && formik.touched.email ? <span className='text-rose-500'>{formik.errors.email}</span> : <></>} */}

          <div
            className={`${styles.input_group} ${
              formik.errors.password && formik.touched.password
                ? "border-rose-600"
                : ""
            }`}
          >
            <input
              type={`${show ? "text" : "password"}`}
              name="password"
              placeholder="Password"
              className={styles.input_text}
              {...formik.getFieldProps("password")}
            />
            <span
              className="icon flex items-center px-4"
              onClick={() => setShow(!show)}
            >
              <HiOutlineKey size={25} />
            </span>
          </div>

          {/* {formik.errors.password && formik.touched.password ? <span className='text-rose-500'>{formik.errors.password}</span> : <></>} */}
          {/* login buttons */}
          <div className="input-button">
            <button type="submit" className={styles.button}>
              Login
            </button>
          </div>
          <div className="input-button">
            <button
              type="button"
              onClick={handleGoogleSignin}
              className={styles.button_custom}
            >
              Sign In with Google{" "}
              <Image
                alt="Google logo"
                src={"/assets/google.svg"}
                width="20"
                height={20}
              ></Image>
            </button>
          </div>
          <div className="input-button">
            <button
              type="button"
              onClick={handleGithubSignin}
              className={styles.button_custom}
            >
              Sign In with Github{" "}
              <Image
                alt="GitHub logo"
                src={"/assets/github.svg"}
                width={25}
                height={25}
              ></Image>
            </button>
          </div>
        </form>

        {/* bottom */}
        <p className="justify-between text-gray-400">
          <Link href={"/register"}>
            <span className="text-blue-700 hover:text-blue-900">
              Create an account
            </span>
          </Link>
        </p>
      </section>
    </Layout>
  );
}

// npm install react-icons --save
//formik hook npm install formik --save
