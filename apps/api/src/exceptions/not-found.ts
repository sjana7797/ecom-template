import { Exception } from "./exception";
import * as HttpStatusCodes from "@repo/utils/http/status-codes";
import * as HttpStatusPhrases from "@repo/utils/http/status-phrases";

export class NotFoundException extends Exception {
  constructor() {
    super(HttpStatusPhrases.NOT_FOUND);
    this.status = HttpStatusCodes.NOT_FOUND;
  }
}
