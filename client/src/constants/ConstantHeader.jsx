import { LOGO } from "./utils";

const ConstantHeader = () => {
  return (
    <div className="flex flex-col items-center text-center">
      <img src={LOGO} alt="Ollato Logo" className="object-contain w-48 h-20" />
      <h1>Ollato Mind Mapping Assessment</h1>
    </div>
  );
};

export default ConstantHeader;
