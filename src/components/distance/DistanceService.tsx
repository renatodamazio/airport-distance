import { useSelector } from "react-redux";
import { GiPathDistance } from "react-icons/gi";
import { MdSailing, MdSpeed, MdTimer } from "react-icons/md";

import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Box,
  Zoom,
} from "@mui/material";
import { Colors } from "../../theme/colors";

function DirectionService() {
  const { nautical, distance, duration, kilometers, transport } = useSelector(
    (state: any) => state.distances
  );

  interface travelMeasuresReference {
    title: string;
    code: string;
    distance: string | number;
    color: string;
    bgColor: string;
    icon: any;
  }

  const travelMeasures: travelMeasuresReference[] = [
    {
      title: "Nautical miles",
      code: "NM",
      distance: nautical ? nautical.toFixed(3) : false,
      color: Colors.primary.dark,
      bgColor: Colors.primary.opacity,
      icon: <MdSailing color={Colors.primary.dark} size="20px" />
    },
    {
      title: "Miles",
      code: "MI",
      distance: distance ? distance : false,
      color: Colors.secondary.dark,
      bgColor: Colors.secondary.opacity,
      icon: <GiPathDistance color={Colors.secondary.dark} size="20px"/>
    },
    {
      title: "Kilometers",
      code: "KM",
      distance: kilometers ? kilometers.toFixed(3) : false,
      color: Colors.success.dark,
      bgColor: Colors.success.opacity,
      icon: <MdSpeed color={Colors.success.dark} size="20px"/>
    },
    {
      title: transport,
      code: transport,
      distance: duration,
      color: Colors.warning.dark,
      bgColor: Colors.warning.opacity,
      icon: <MdTimer color={Colors.warning.dark} size="20px"/>
    }
  ];
  return (
    <List>
      {travelMeasures.map((travel: travelMeasuresReference, index: number) => {
        return (
          travel.distance ? (
            <ListItem style={{ background: travel?.bgColor, borderRadius: 3, marginBottom: 2}}>
              <ListItemIcon>
                {travel?.icon}
              </ListItemIcon>
              <ListItemText>
                <Tooltip
                  title={travel?.title}
                  TransitionComponent={Zoom}
                  placement="top-start"
                >
                  <Box style={{ width: "fit-content", color: travel?.color }}>
                    *{travel?.code}: <strong>{travel?.distance}</strong>
                  </Box>
                </Tooltip>
              </ListItemText>
            </ListItem>
          ) : ""
        );
      })}
    </List>
  );
}

export default DirectionService;
