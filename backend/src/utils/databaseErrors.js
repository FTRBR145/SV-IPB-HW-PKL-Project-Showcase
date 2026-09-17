export function isDatabaseUnavailable(error) {
  return ['ECONNREFUSED', 'ECONNRESET', 'ETIMEDOUT', 'ENETUNREACH', 'EHOSTUNREACH', 'EAI_AGAIN', '08001', '08003', '08006', '57P01', '57P02', '57P03', '53300'].includes(error?.code) ||
    /^(Connection terminated unexpectedly|Connection terminated due to connection timeout|timeout exceeded when trying to connect)$/.test(error?.message || '');
}
