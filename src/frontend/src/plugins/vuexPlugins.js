import { createResources } from "@/common/helpers";

export default function (store) {
  store.$api = createResources();
}
