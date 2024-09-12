import Logo from "../../assets/images/login_page_logo.png";
import BackgroundImage from "../../assets/images/login_background_image.png";

import { useForm, SubmitHandler } from "react-hook-form";
import Switch from "../../components/switch/switch";

interface IFormInput {
  email: string;
  password: string;
}

function LoginPage() {
  const { register, handleSubmit } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <img
        className="hidden lg:flex"
        src={BackgroundImage}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          bottom: 0,
          maxWidth: "50%",
          height: "100vh",
          filter: "brightness(70%)",
        }}
      />

      <div></div>
      <div className="max-w-96 p-3 m-auto min-w-80">
        <div className="lg:-ml-8">
          <img src={Logo} style={{ height: "15.62rem" }} />
        </div>
        <p className="font-GBold font-bold text-[1.87rem] text-white">
          Nice to see you!
        </p>
        <p className="font-GRegular font-normal text-[0.87rem] text-[#A0AEC0]">
          Enter your email and password to sign in
        </p>
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <div className="grid mt-8">
            <label className="font-GRegular font-normal text-[0.87rem] text-white px-2 py-1">
              Email
            </label>
            <input
              {...register("email", { required: true })}
              placeholder="Your email address"
              type="text"
              className="bg-black placeholder-primary-main outline-0 border !border-primary-main !text-primary-main font-GRegular font-normal text-[0.87rem] py-3 px-4 rounded-[1.25rem]"
            />
          </div>
          <div className="grid mt-6">
            <label className="font-GRegular font-normal text-[0.87rem] text-white px-2 py-1">
              Password
            </label>
            <input
              {...register("password", { required: true })}
              placeholder="Your Password"
              autoComplete="off"
              list="off"
              className="bg-black placeholder-primary-main outline-0 border border-primary-main text-primary-main font-GRegular font-normal text-[0.87rem] py-3 px-4 rounded-[1.25rem]"
            />
          </div>
          <div className="flex items-center gap-2 mt-6">
            <Switch />
            <p className="font-GRegular font-normal text-[0.75rem] text-white">
              Remember me{" "}
            </p>
          </div>
          <input
            type="submit"
            value={"SIGN IN"}
            autoComplete="off"
            list="off"
            className="bg-primary-main   w-full cursor-pointer transition-all duration-300 ease-linear hover:bg-[#08ef65fa] font-GBold font-bold text-[0.75rem] text-white py-3 rounded-[0.75rem] mt-9"
          />
        </form>
        <p className="font-GRegular font-normal text-[0.87rem] text-[#A0AEC0] text-center mt-4">
          Don't have an account?{" "}
          <span className="font-GBold font-bold text-[0.87rem] text-white">
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
