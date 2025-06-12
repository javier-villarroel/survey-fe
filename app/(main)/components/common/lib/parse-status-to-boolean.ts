import { EStatusNames } from "./permissions/schemas";

export const parseStatusToBoolean = (statusName: EStatusNames): boolean => {
  return statusName === EStatusNames.ACTIVE;
};
