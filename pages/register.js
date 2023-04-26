import styles from "../styles/Form.module.css";
import Layout from "@/layout/layout";
import { registerValidate } from "@/lib/validate";
import { useFormik } from "formik";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { HiAtSymbol, HiOutlineKey, HiOutlineUser } from "react-icons/hi2";

export default function Register() {
  const [show, setShow] = useState({ password: false, cpassword: false });
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      cpassword: "",
    },
    validate: registerValidate,
    onSubmit,
  });

  async function onSubmit(values) {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    };

    await fetch("http://localhost:3000/api/auth/signup", options)
      .then((res) => res.json())
      .then((data) => {
        if (data) router.push("http://localhost:3000");
      });
  }

  return (
    <Layout>
      <Head>
        <title>Register</title>
      </Head>

      <section className="flex flex-col w-3/4 gap-5 mx-auto">
        <div className="title">
          <h1 className="py-3 text-4xl font-bold text-gray-800">Register</h1>
          <p className="mx-auto text-gray-400">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
        </div>

        {/* form */}
        <form className="flex flex-col gap-5" onSubmit={formik.handleSubmit}>
          <div
            className={`${styles.input_group} ${
              formik.errors.username && formik.touched.username
                ? "border-rose-600"
                : ""
            }`}
          >
            <input
              type="text"
              name="Username"
              placeholder="Username"
              className={styles.input_text}
              {...formik.getFieldProps("username")}
            />
            <span className="flex items-center px-4 icon">
              <HiOutlineUser size={25} />
            </span>
          </div>
          {/* {formik.errors.username && formik.touched.username ? <span className='text-rose-500'>{formik.errors.username}</span> : <></>} */}
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
            <span className="flex items-center px-4 icon">
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
              type={`${show.password ? "text" : "password"}`}
              name="password"
              placeholder="Password"
              className={styles.input_text}
              {...formik.getFieldProps("password")}
            />
            <span
              className="flex items-center px-4 icon"
              onClick={() => setShow({ ...show, password: !show.password })}
            >
              <HiOutlineKey size={25} />
            </span>
          </div>
          {/* {formik.errors.password && formik.touched.password ? <span className='text-rose-500'>{formik.errors.password}</span> : <></>} */}

          <div
            className={`${styles.input_group} ${
              formik.errors.cpassword && formik.touched.cpassword
                ? "border-rose-600"
                : ""
            }`}
          >
            <input
              type={`${show.cpassword ? "text" : "password"}`}
              name="cpassword"
              placeholder="Confirm Password"
              className={styles.input_text}
              {...formik.getFieldProps("cpassword")}
            />
            <span
              className="flex items-center px-4 icon"
              onClick={() => setShow({ ...show, cpassword: !show.cpassword })}
            >
              <HiOutlineKey size={25} />
            </span>
          </div>
          {/* {formik.errors.cpassword && formik.touched.cpassword ? <span className='text-rose-500'>{formik.errors.cpassword}</span> : <></>} */}

          {/* login buttons */}
          <div className="input-button">
            <button type="submit" className={styles.button}>
              Sign Up
            </button>
          </div>
        </form>

        {/* bottom */}
        <p className="text-center text-gray-400">
          Have an account?{" "}
          <Link href={"/login"}>
            <span className="text-blue-700 hover:text-blue-900">Log In</span>
          </Link>
        </p>
      </section>
    </Layout>
  );
}

// npm install -D prisma
// npx prisma init
