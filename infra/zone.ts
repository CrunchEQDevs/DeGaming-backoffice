import { config } from "../config";
import { isProductionStage, isStagingStage } from "../stage";

export const zone = isProductionStage
  ? (() => {
      switch (config.sstAws.region) {
        case "eu-central-1":
          return "Z057694355FMAF5I9HJ0";
      }
    })()
  : isStagingStage
    ? (() => {
        switch (config.sstAws.region) {
          case "eu-central-1":
            return "Z000536215T7CKZND9EG1";
        }
      })()
    : (() => {
        switch (config.sstAws.region) {
          case "eu-central-1":
            return "Z00904262WOMVZW50N075";
        }
      })();
