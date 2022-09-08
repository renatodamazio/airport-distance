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

function DirectionService() {
  const { nautical, distance, duration, kilometers } = useSelector(
    (state: any) => state.distances
  );
  return (
    <List>
      <ListItem>
        <ListItemIcon>
          <MdSpeed />
        </ListItemIcon>
        <ListItemText>
          <Tooltip
            title="Kilometers"
            TransitionComponent={Zoom}
            placement="top-start"
          >
            <Box style={{ width: "fit-content" }}>
              *KM: <strong>{kilometers.toFixed(3)}</strong>
            </Box>
          </Tooltip>
        </ListItemText>
      </ListItem>

      <ListItem>
        <ListItemIcon>
          <MdSailing />
        </ListItemIcon>
        <ListItemText>
          <Tooltip
            title="Nautical Miles"
            TransitionComponent={Zoom}
            placement="top-start"
          >
            <Box style={{ width: "fit-content" }}>
              *NM: <strong>{nautical?.toFixed(3)}</strong>
            </Box>
          </Tooltip>{" "}
        </ListItemText>
      </ListItem>

      <ListItem style={{ display: !distance ? "none" : "" }}>
        <ListItemIcon>
          <GiPathDistance />
        </ListItemIcon>
        <ListItemText>
          <Tooltip
            title="Miles"
            TransitionComponent={Zoom}
            placement="top-start"
          >
            <Box style={{ width: "fit-content" }}>
              *ML: <strong>{distance}</strong>
            </Box>
          </Tooltip>
        </ListItemText>
      </ListItem>

      <ListItem style={{ display: !duration ? "none" : "" }}>
        <ListItemIcon>
          <MdTimer />
        </ListItemIcon>
        <ListItemText>
          Driving <strong>{duration}</strong>
        </ListItemText>
      </ListItem>
    </List>
  );
}

export default DirectionService;
