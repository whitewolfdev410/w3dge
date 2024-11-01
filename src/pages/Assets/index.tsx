import { HeroHeading, HeroHeadingTwo } from "../../components/FontComponent";
import LogoIcon from "../../assets/images/logo.png";
import { useState } from "react";
import { toast } from "react-toastify";
import { useAccount } from "wagmi";
import WontToLearn from "../../components/footer/WontToLearn";
import { setBoxViewData, setUserData } from "../../context/boxDataSlice";
import axios from "axios";
import { useDispatch } from "react-redux";
import LanguageSwitcher from "../../components/header/languageSwitcher";

function Assets() {
  const [inputValue, setInputValue] = useState<string>("");
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value;
    setInputValue(value);
  };
  const { address } = useAccount();
  const dispatch = useDispatch();
  const [activeLang, setActiveLang] = useState("th");
  const parseResponseBody = (responseBody: any) => {
    try {
      return typeof responseBody === "string"
        ? JSON.parse(responseBody)
        : responseBody;
    } catch (e) {
      console.error("Error parsing response data:", e);
      return null;
    }
  };
  const fetchDataFromAWS = async (path: string, query = {}) => {
    try {
      const apiUrl = import.meta.env.VITE_AWS_API_URL;
      const { data } = await axios.post(apiUrl, {
        path: `w3dgeData/${path}`,
        operation: "find",
        query,
      });
      return parseResponseBody(data.body);
    } catch (err) {
      console.error(`Error fetching data from ${path}:`, err);
      return null;
    }
  };
  const countryMapping = {
    th: "Thailand",
    vn: "Vietnam",
    my: "Malaysia",
    id: "Indonesia",
    kh: "Cambodia",
    ph: "Philippines",
  } as const;
  const handleSubmit = async () => {
    setIsClicked(true);
    let data = {
      identifier_code: inputValue,
      wallet_address: address,
      location:
        countryMapping[activeLang as keyof typeof countryMapping] || activeLang,
    };
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
        toast.success("Success to activate");
      }
      setTimeout(() => setIsClicked(false), 3000);
      const userData = await fetchDataFromAWS("UserData", {
        wallet_address: address,
      });
      const boxData = await fetchDataFromAWS("BoxView", {
        box_id: { $in: userData?.[0]?.boxes },
      });
      dispatch(setBoxViewData(boxData));
      dispatch(
        setUserData(
          userData?.[0] || {
            staking_pools: [
              {
                pool_type: "2%",
                amount_locked: 0,
                reward_earned: 0,
              },
              {
                pool_type: "3%",
                amount_locked: 0,
                reward_earned: 0,
              },
              {
                pool_type: "5%",
                amount_locked: 0,
                reward_earned: 0,
              },
              {
                pool_type: "10%",
                amount_locked: 0,
                reward_earned: 0,
              },
            ],
          }
        )
      );
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
        <div className="relative w-full h-70 flex justify-center">
          <div className="relative w-fit">
            <video
              src="/src/assets/boxVideo.mp4"
              className={`w-100 h-auto object-cover rounded-lg shadow-lg transition-opacity duration-500 ease-in-out ${"opacity-100"}`}
              style={{ width: "45rem" }}
              autoPlay
              loop
              muted
            />
          </div>
        </div>
        <HeroHeadingTwo text={"Bind your box"} />
        <div className="bg-gray-700 flex justify-between px-3 py-1 gap-2 items-center mt-8 rounded-md h-[3rem]">
          <div className="flex gap-2 items-center w-[100%]">
            <div
              className="w-[2rem] h-[1.8rem]"
              style={{
                backgroundImage: `url(${LogoIcon})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "contain",
              }}
            ></div>
            <input
              className="text-primary-main font-GBold font-bold text-[1.25rem] w-[7rem] bg-gray-700"
              type="text"
              onChange={handleValueChange}
            />
          </div>
          <p
            className="text-white font-GRegular font-normal text-[0.85rem]"
            style={{ whiteSpace: "nowrap" }}
          >
            enter code
          </p>
        </div>
        <div className="px-3 gap-3 items-center mt-8 rounded-md grid">
          <p
            className="text-white font-GRegular font-normal text-[1rem]"
            style={{ whiteSpace: "nowrap" }}
          >
            Your Location
          </p>
          <div className="relative py-2">
            <LanguageSwitcher
              activeLang={activeLang}
              setActiveLang={setActiveLang}
            />
          </div>
        </div>

        <div
          className={` ${
            isClicked
              ? "stake-loading"
              : "py-2 rounded-md bg-primary-main -ml-2 cursor-pointer transition-all duration-300 ease-linear px-8 mt-2"
          } `}
        >
          <p
            className={`text-center font-bold font-GBold text-white text-[1.5rem]`}
            onClick={handleSubmit}
          >
            {isClicked ? "" : "activate"}
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
