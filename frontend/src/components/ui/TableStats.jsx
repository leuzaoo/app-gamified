import {
  BrainIcon,
  DumbbellIcon,
  FootprintsIcon,
  HeartCrackIcon,
} from "lucide-react";

const TableStats = ({ user }) => {
  return (
    <div className="my-5 border">
      <div className="uppercase">
        <ul className="grid grid-cols-2 justify-items-center gap-2 px-10 py-4">
          <li className="flex items-center gap-2">
            <DumbbellIcon size={20} />{" "}
            <p className="flex items-center gap-1 font-extralight">
              FOR:{" "}
              <span className="text-lg font-medium">
                {user.attributes.strength}
              </span>
            </p>
          </li>
          <li className="flex items-center gap-2">
            <BrainIcon size={20} />{" "}
            <p className="flex items-center gap-1 font-extralight">
              INT:{" "}
              <span className="text-lg font-medium">
                {user.attributes.intelligence}
              </span>
            </p>
          </li>
          <li className="flex items-center gap-2">
            <HeartCrackIcon size={20} />{" "}
            <p className="flex items-center gap-1 font-extralight">
              VIT:{" "}
              <span className="text-lg font-medium">
                {user.attributes.vitality}
              </span>
            </p>
          </li>
          <li className="flex items-center gap-2">
            <FootprintsIcon size={20} />{" "}
            <p className="flex items-center gap-1 font-extralight">
              AGI:{" "}
              <span className="text-lg font-medium">
                {user.attributes.agility}
              </span>
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TableStats;
