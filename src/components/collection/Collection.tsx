import React, { useCallback, useState } from "react";
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
import { CollectionDetail } from "../../services/collection.service";

export interface CollectionProps {
  collectionDetail: CollectionDetail;
  platters: PlatterData[];

  editable?: boolean;
  onPlatterClick(data: PlatterData): Promise<void>;
}

const useStyles = makeStyles({
  media: {
    height: "781px",
    width: "100%",
  },
  root: {
    //overflowY: "scroll",
    height: "auto",
  },
  platter: {
    height: "auto",
  },
});

export default function Collection(props: CollectionProps) {
  const classes = useStyles();
  const collectionDetail = props.collectionDetail;

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

  const isPlatter = useCallback(() => {
    if (!!props.platters) {
      if (props.platters.length === 0) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  }, [props.platters]);
  return (
    <Card className={classes.root} elevation={0}>
      <CardMedia image={collectionDetail.imageUrl} className={classes.media} />
      {/* <AvatarGroup> */}
      {/* {collectionDetail.members.map((member: UserView) => (
        <Avatar
          key={member.id}
          alt={member.displayName}
          src={member.imageUrl}
        />
      ))} */}
      {/* </AvatarGroup> */}

      {isPlatter() && <div className={classes.platter}>{platters}</div>}

      {!isPlatter() && (
        <div className={classes.platter}>
          <div>플레터가 아직 생성되지 않았습니다.</div>
          <div>테스크 모드에서 첫 플레터를 생성해보세요.</div>
        </div>
      )}
    </Card>
  );
}
