import React, { useState } from "react";
import { Text, Link } from "@chakra-ui/react";

interface FlexTextProps {
  children: string;
  charLimit: number;
  showMoreLabel?: string;
  showLessLabel?: string;
  ellipsis?: string;
}

const FlexText: React.FC<FlexTextProps> = ({
  showMoreLabel = "read more",
  showLessLabel = "read less",
  children,
  charLimit,
  ellipsis = "...",
}) => {
  const [showMore, setShowMore] = useState(false);
  const isItOverTheLimit = charLimit >= children.length;
  const shortText =
    children.substr(0, charLimit) +
    (charLimit >= children.length ? "" : ellipsis);
  const ReadMore = (
    <Link as="sub" color="blue.600" onClick={() => setShowMore(true)}>
      {showMoreLabel}
    </Link>
  );
  const ReadLess = (
    <Link as="sub" color="blue.600" onClick={() => setShowMore(false)}>
      {showLessLabel}
    </Link>
  );
  return (
    <>
      <Text>
        {showMore ? children : shortText}
        {"   "}
        {isItOverTheLimit ? null : showMore ? ReadLess : ReadMore}
      </Text>
    </>
  );
};
export default FlexText;
