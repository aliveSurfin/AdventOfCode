class Valve {
    constructor(flowRate, tunnels) {
        this.flowRate = flowRate;
        this.tunnels = tunnels;
        this.isOpen = false;
    }
}

function getMaxPressureRelease(valves, currentValve, timeRemaining) {
    if (timeRemaining === 0) {
        return 0;
    }

    let maxPressure = 0;
    console.log(currentValve)
    for (const tunnel of currentValve.tunnels) {
        const [nextValveKey, travelTime] = tunnel.split(';');
        const nextValve = valves[nextValveKey];
        console.log(tunnel)
        if (!nextValve.isOpen) {
            // Simulate opening the valve
            nextValve.isOpen = true;

            // Calculate the pressure released during the remaining time
            const pressureRelease = nextValve.flowRate * Math.min(travelTime, timeRemaining);

            // Recursively explore the network
            const remainingPressure = getMaxPressureRelease(valves, nextValve, timeRemaining - travelTime);

            // Update the maximum pressure
            maxPressure = Math.max(maxPressure, pressureRelease + remainingPressure);

            // Close the valve (backtrack)
            nextValve.isOpen = false;
        }
    }

    return maxPressure;
}

// Define the valve network (input data)
const input = `Valve JI has flow rate=21; tunnels lead to valves WI, XG
Valve DM has flow rate=3; tunnels lead to valves JX, NG, AW, BY, PF
Valve AZ has flow rate=0; tunnels lead to valves FJ, VC
Valve YQ has flow rate=0; tunnels lead to valves TE, OP
Valve WI has flow rate=0; tunnels lead to valves JI, VC
Valve NE has flow rate=0; tunnels lead to valves ZK, AA
Valve FM has flow rate=0; tunnels lead to valves LC, DU
Valve QI has flow rate=0; tunnels lead to valves TE, JW
Valve OY has flow rate=0; tunnels lead to valves XS, VF
Valve XS has flow rate=18; tunnels lead to valves RR, OY, SV, NQ
Valve NU has flow rate=0; tunnels lead to valves IZ, BD
Valve JX has flow rate=0; tunnels lead to valves DM, ZK
Valve WT has flow rate=23; tunnels lead to valves OV, QJ
Valve KM has flow rate=0; tunnels lead to valves TE, OL
Valve NG has flow rate=0; tunnels lead to valves II, DM
Valve FJ has flow rate=0; tunnels lead to valves AZ, II
Valve QR has flow rate=0; tunnels lead to valves ZK, KI
Valve KI has flow rate=9; tunnels lead to valves ZZ, DI, TL, AJ, QR
Valve ON has flow rate=0; tunnels lead to valves LC, QT
Valve AW has flow rate=0; tunnels lead to valves DM, AA
Valve HI has flow rate=0; tunnels lead to valves TE, VC
Valve XG has flow rate=0; tunnels lead to valves II, JI
Valve II has flow rate=19; tunnels lead to valves LF, NG, OL, FJ, XG
Valve VC has flow rate=24; tunnels lead to valves WI, HI, AZ
Valve VJ has flow rate=0; tunnels lead to valves UG, AA
Valve IZ has flow rate=0; tunnels lead to valves VF, NU
Valve EJ has flow rate=0; tunnels lead to valves ZK, LC
Valve DU has flow rate=12; tunnels lead to valves TC, UG, FM
Valve ZK has flow rate=10; tunnels lead to valves JX, EJ, JW, QR, NE
Valve XF has flow rate=25; tunnels lead to valves OP, VT
Valve LC has flow rate=4; tunnels lead to valves FM, EJ, ON, AJ, PF
Valve SV has flow rate=0; tunnels lead to valves XS, IY
Valve LF has flow rate=0; tunnels lead to valves II, OV
Valve DI has flow rate=0; tunnels lead to valves KI, BY
Valve OP has flow rate=0; tunnels lead to valves YQ, XF
Valve NQ has flow rate=0; tunnels lead to valves TC, XS
Valve QJ has flow rate=0; tunnels lead to valves VT, WT
Valve IY has flow rate=22; tunnel leads to valve SV
Valve AJ has flow rate=0; tunnels lead to valves LC, KI
Valve TE has flow rate=11; tunnels lead to valves QI, HI, KM, YQ
Valve ZZ has flow rate=0; tunnels lead to valves KI, AA
Valve VT has flow rate=0; tunnels lead to valves XF, QJ
Valve OL has flow rate=0; tunnels lead to valves KM, II
Valve TC has flow rate=0; tunnels lead to valves NQ, DU
Valve TL has flow rate=0; tunnels lead to valves VF, KI
Valve QT has flow rate=0; tunnels lead to valves AA, ON
Valve BY has flow rate=0; tunnels lead to valves DM, DI
Valve OV has flow rate=0; tunnels lead to valves LF, WT
Valve VN has flow rate=0; tunnels lead to valves RR, BD
Valve VF has flow rate=13; tunnels lead to valves OY, IZ, TL
Valve BD has flow rate=17; tunnels lead to valves NU, VN
Valve UG has flow rate=0; tunnels lead to valves VJ, DU
Valve PF has flow rate=0; tunnels lead to valves LC, DM
Valve RR has flow rate=0; tunnels lead to valves XS, VN
Valve AA has flow rate=0; tunnels lead to valves QT, ZZ, AW, VJ, NE
Valve JW has flow rate=0; tunnels lead to valves ZK, QI`;

// Parse the input and create valve objects
const valves = {};
const lines = input.trim().split('\n');
for (const line of lines) {
    const [valveKey, info] = line.split(' has ');
    console.log(line)
    console.log(info)
    const [flowRateStr, tunnelsStr] = info.split('; ');
    const flowRate = parseInt(flowRateStr.split('=')[1], 10);
    const tunnels = tunnelsStr.split(', ');
    valves[valveKey] = new Valve(flowRate, tunnels);
}

// Start at a specific valve (e.g., Valve JI)
const startValveKey = 'Valve JI';

if (valves[startValveKey]) {
    valves[startValveKey].isOpen = true; // Start with the first valve open
    const maxPressureRelease = getMaxPressureRelease(valves, valves[startValveKey], 30); // 30 minutes
    console.log('Maximum Pressure Release:', maxPressureRelease);
} else {
    console.log('Start valve not found.');
}