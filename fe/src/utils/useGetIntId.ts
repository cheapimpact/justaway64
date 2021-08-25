import Hashids from "hashids";
import { useRouter } from "next/router";

//bisa dibuat generic gacuma ambil id aja... kalau niat
export const useGetIntId = () => {
  const router = useRouter();
  const hashids = new Hashids();
  const id = router.query.id as string;
  if (hashids.isValidId(id)) {
    const [intId] = hashids.decode(id);
    return intId as number;
  }
  return -1;
};
