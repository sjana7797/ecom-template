import { Exception } from "./exception";
import * as HttpStatusCodes from "@repo/utils/http/status-codes";
import * as HttpStatusPhrases from "@repo/utils/http/status-phrases";

export class UnauthorizedException extends Exception {
  constructor() {
    super(HttpStatusPhrases.UNAUTHORIZED);
    this.status = HttpStatusCodes.UNAUTHORIZED;
  }
}
