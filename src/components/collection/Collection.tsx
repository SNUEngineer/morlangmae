import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import PlatterEditor, {
  PlatterEditorProps,
  PlatterData,
} from "../platter/PlatterEditor";
import Card from "@material-ui/core/Card";
import Avatar from "@material-ui/core/Avatar";
import CardMedia from "@material-ui/core/CardMedia";
import { UserView } from "../../services/user.service";
import Platter from "./Platter";

export interface CollectionProps {
  collectionDetail: CollectionDetailData;
  platters: PlatterData[];
  editable?: boolean;
  onPlatterClick(data: PlatterData): Promise<void>;
}

interface CollectionDetailData {
  id: number;
  title: string;
  imageUrl: string;
  members: UserView[];
}

const useStyles = makeStyles({
  media: {
    height: 0,
    paddingTop: "62.25%",
    width: "100%",
  },
  root: {
    overflowY: "scroll",
    paddingBottom: 100,
  },
});

export default function Collection(props: CollectionProps) {
  const classes = useStyles();
  const platters = props.platters.map((data: PlatterData) => {
    return (
      <Platter
        editable={props.editable}
        key={data.id}
        id={data.id}
        platterData={data}
        onClick={props.onPlatterClick}
      />
    );
  });
  const collectionDetail = props.collectionDetail;
  return (
    <Card className={classes.root} elevation={0}>
      <CardMedia image={collectionDetail.imageUrl} className={classes.media} />
      {/* <AvatarGroup> */}
      {collectionDetail.members.map((member: UserView) => (
        <Avatar
          key={member.id}
          alt={member.displayName}
          src={member.imageUrl}
        />
      ))}
      {/* </AvatarGroup> */}
      {platters}
    </Card>
  );
}
