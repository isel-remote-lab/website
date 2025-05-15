let config: any;

try {
    config = require("../../../api/host/src/main/resources/domain-config.json");
} catch (e) {
    try {
        config = require("../../domain-config.json");
    } catch (e2) {
        throw new Error("domain-config.json not found in any known location");
    }
}

export const domainConfig = config;
export const labNameOptional = domainConfig.laboratory.labName.optional;
export const labNameMin = domainConfig.laboratory.labName.min;
export const labNameMax = domainConfig.laboratory.labName.max;
export const labDescriptionOptional = domainConfig.laboratory.labDescription.optional;
export const labDescriptionMin = domainConfig.laboratory.labDescription.min;
export const labDescriptionMax = domainConfig.laboratory.labDescription.max;
export const labQueueLimitOptional = domainConfig.laboratory.labQueueLimit.optional;
export const labQueueLimitMin = domainConfig.laboratory.labQueueLimit.min;
export const labQueueLimitMax = domainConfig.laboratory.labQueueLimit.max;
export const labDurationOptional = domainConfig.laboratory.labDuration.optional;
export const labDurationMin = domainConfig.laboratory.labDuration.min;
export const labDurationMax = domainConfig.laboratory.labDuration.max;
export const labDurationUnit = domainConfig.laboratory.labDuration.unit;