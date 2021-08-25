import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Menu,
  MenuButton,
  IconButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import Hashids from "hashids";
import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import NextLink from "next/link";

interface CreatorActionsProps {
  id: number;
}

const hashids = new Hashids();
export const CreatorActions: React.FC<CreatorActionsProps> = ({ id }) => {
  return (
    <>
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="Options"
          icon={<ChevronDownIcon />}
          variant="ghost"
        />

        <MenuList>
          <NextLink
            href="/notes/edit/[id]"
            as={`/notes/edit/${hashids.encode(id.toString())}`}
          >
            <MenuItem icon={<FaEdit />} command="⌘T">
              Edit
            </MenuItem>
          </NextLink>

          <MenuItem icon={<FaTrash />} command="⌘T">
            {" "}
            Delete
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  );
};
