import { Exception } from "./exception";
import * as HttpStatusCodes from "@repo/utils/http/status-codes";
import * as HttpStatusPhrases from "@repo/utils/http/status-phrases";

export class BadRequestException extends Exception {
  constructor() {
    super(HttpStatusPhrases.BAD_REQUEST);
    this.status = HttpStatusCodes.BAD_REQUEST;
  }
}
