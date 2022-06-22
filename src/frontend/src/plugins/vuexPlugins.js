import { createResources } from "@/common/helpers";
import JWTService from "@/services/jwt.service";

export default function (store) {
  store.$api = createResources();
  store.$jwt = JWTService;
}
