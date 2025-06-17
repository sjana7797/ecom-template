import * as HttpStatusCodes from "@repo/utils/http/status-codes";
import * as HttpStatusPhrases from "@repo/utils/http/status-phrases";
import { ContentfulStatusCode } from "hono/utils/http-status";

export class Exception extends Error {
  status: ContentfulStatusCode;

  constructor(message?: string) {
    super(message ?? HttpStatusPhrases.INTERNAL_SERVER_ERROR);
    this.name = this.constructor.name;
    this.status = HttpStatusCodes.INTERNAL_SERVER_ERROR;
  }
}
