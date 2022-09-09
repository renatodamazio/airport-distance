import { IconButton, ButtonGroup, Tooltip } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";

import { setTransport } from "../../store/reducers/distances";
import { Colors } from "../../theme/colors";

import {
  MdDirectionsCar,
  MdOutlineDirectionsBike,
  MdDirectionsBus,
  MdDirectionsWalk,
} from "react-icons/md";

interface transportReference {
  icon: string | any;
  code: string;
  bgColor: any;
}

function Transport() {
  const dispatch = useDispatch();
  const { transport: activeTransport } = useSelector(
    (state: any) => state.distances
  );

  const transports:transportReference[] = [
    {
      icon: <MdDirectionsCar color={Colors?.shadow.main}/>,
      bgColor: Colors?.primary?.light,
      code: "DRIVING",
    },
    {
      icon: <MdOutlineDirectionsBike color={Colors?.shadow.main} />,
      code: "BICYCLING",
      bgColor: Colors?.success?.light,
    },
    {
      icon: <MdDirectionsBus color={Colors?.shadow.main} />,
      code: "TRANSIT",
      bgColor: Colors?.error?.light,
    },
    {
      icon: <MdDirectionsWalk color={Colors?.shadow.main} />,
      code: "WALKING",
      bgColor: Colors?.warning?.light,
    },
  ];

  const styles = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const defineTravelTransport = (ev: transportReference) => {
    dispatch(setTransport(ev.code));
  };

  return (
    <ButtonGroup
      variant="outlined"
      aria-label="outlined button group"
      style={styles}
    >
      {transports.map((transport: any, key: number) => {
        return (
          <Tooltip key={key} title={transport.code}>
            <IconButton
              style={{
                background:
                  activeTransport === transport.code ? `${transport.bgColor}` : "",
              }}
              onClick={() => defineTravelTransport(transport)}
              key={key}
            >
              {transport.icon}
            </IconButton>
          </Tooltip>
        );
      })}
    </ButtonGroup>
  );
}

export default Transport;
