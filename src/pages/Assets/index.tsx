import { HeroHeading, HeroHeadingTwo } from "../../components/FontComponent";
import LogoIcon from "../../assets/images/logo.png";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useAccount } from "wagmi";
import WontToLearn from "../../components/footer/WontToLearn";

function Assets() {
  const [inputValue, setInputValue] = useState<string>("");
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value;
    setInputValue(value);
  };
  const { address } = useAccount();
  const handleSubmit = async () => {
    setIsClicked(true);
    let data = {
      identifier_code: inputValue,
      wallet_address: address,
    };
    console.log("here is handle clicked::", data);
    const apiUrl =
      "https://gygxr53i33.execute-api.ap-southeast-2.amazonaws.com/Prod/Activate";
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const jsonResponse = await response.json();
      if (!response.ok) {
        toast.error("Error to activate: " + jsonResponse.error);
      } else {
        toast.success(jsonResponse);
      }
      setTimeout(() => setIsClicked(false), 3000);
    } catch (error: any) {
      toast.error(`An error occurred: ${error.message}`);
      setTimeout(() => setIsClicked(false), 3000);
    }
  };
  return (
    <div className="section-node p-10 xl:p-5">
      <div className="row  hidden xl:grid">
        <HeroHeading text={"Activate"} />
      </div>
      <div className="flex flex-col items-center space-y-4 h-fit">
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
        <div className="relative w-full h-70 flex justify-center">
          <div className="relative w-fit">
            <video
              src="/src/assets/boxVideo.mp4"
              className={`w-80 h-auto object-cover rounded-lg shadow-lg transition-opacity duration-500 ease-in-out ${"opacity-100"}`}
              style={{ width: "30rem" }}
              autoPlay
              loop
              muted
            />
          </div>
        </div>
        <HeroHeadingTwo text={"Bind your box"} />
        <div className="bg-gray-700 flex justify-between px-3 py-1 gap-12 items-center mt-8 rounded-md">
          <div className="flex gap-2 items-center w-[100%]">
            <div
              className="w-[1.62rem] h-[1.25rem]"
              style={{
                backgroundImage: `url(${LogoIcon})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "contain",
              }}
            ></div>
            <input
              className="text-primary-main font-GBold font-bold text-[1.25rem] w-[100%] bg-gray-700"
              type="password"
              onChange={handleValueChange}
            />
          </div>
          <p
            className="text-white font-GRegular font-normal text-[0.62rem]"
            style={{ whiteSpace: "nowrap" }}
          >
            enter code
          </p>
        </div>

        <div
          className={` ${
            isClicked
              ? "stake-loading"
              : "py-3 rounded-md bg-primary-main -ml-2 cursor-pointer transition-all duration-300 ease-linear px-4"
          } `}
        >
          <p
            className={`text-center font-bold font-GBold text-white text-[1.25rem]`}
            onClick={handleSubmit}
          >
            {isClicked ? "" : "Activate"}
          </p>
        </div>
      </div>
      <div className="md:mt-10 mt-0 md:mt-0 flex justify-start">
        <WontToLearn />
      </div>
    </div>
  );
}

export default Assets;
