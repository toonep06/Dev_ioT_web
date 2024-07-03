const BASE_URL = 'https://www.blinkemerge.app:443/api';

async function fetchFromThingsBoard(endpoint, options = {}) {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      'X-Authorization': `Bearer ${options.token || ''}`,
    },
    ...options,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Something went wrong');
  }

  return response.json();
}

export async function getDeviceTimeseries(token, deviceId, keys = 'tds,ph') {
  const response = await fetchFromThingsBoard(`/plugins/telemetry/DEVICE/${deviceId}/values/timeseries?keys=${keys}&useStrictDataTypes=true`, {
    method: 'GET',
    token,
  });

  return response;
}

export async function getDeviceTimeseriesWithRange(token, deviceId, keys = 'tds,ph', startTs, endTs) {
  const response = await fetchFromThingsBoard(`/plugins/telemetry/DEVICE/${deviceId}/values/timeseries?keys=${keys}&startTs=${startTs}&endTs=${endTs}&interval=600000&agg=AVG&orderBy=ASC&useStrictDataTypes=true`, {
    method: 'GET',
    token,
  });

  return response;
}
