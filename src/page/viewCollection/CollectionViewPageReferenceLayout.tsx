import React, { useState, Fragment, useRef  } from "react";


export function CollectionToolBar(props: any) {
  const classes = useStyles();
  const options = ["진행 순", "진행 역순", "내가 참여한 플레터"];
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(options[0]);

  const [menuCoordinates, setMenuCoordinates] = useState({
    x: 0,
    y: 0,
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  function DotMenuDialog(props) {
    const { onClose, selectedValue, open } = props;

    const handleClose = () => {
      onClose(selectedValue);
    };

    const handleListItemClick = (value) => {
      onClose(value);
    };

    return (
      <Dialog
        onClose={handleClose}
        aria-labelledby="simple-dialog-title"
        open={open}
        classes={{
          paperScroll: {},
        }}
      >
        <List>
          <ListItem button onClick={() => handleListItemClick(options[0])}>
            <ListItemText primary={options[0]} />
          </ListItem>

          <ListItem button onClick={() => handleListItemClick(options[1])}>
            <ListItemText primary={options[1]} />
          </ListItem>
        </List>
      </Dialog>
    );
  }

  return (
    <AppBar
      position="fixed"
      className={classNames({
        [classes.appBar]: true,
      })}
    >
      <Toolbar>
        <div className={pageStyle.bar_container}>
          <div className={pageStyle.mode_container}>
            <Switch
              checked={props.editable}
              onChange={() => props.setEditable(!props.editable)}
              name="collection-mode"
            />
          </div>
          {/* # Platter Search # Sort */}
          <div className={pageStyle.search_container}>
            <div className={pageStyle.search_icon_container}>플레터 검색</div>
            <div className={pageStyle.split_bar}></div>
            <div className={pageStyle.search_bar}>
              플레터 타이틀로 검색해주세요
            </div>
          </div>

          <div className={pageStyle.item_align_menu}>
            <div
              className={pageStyle.dot_menu}
              onClick={(event) => {
                handleClickOpen();
                setMenuCoordinates(event.target.getBoundingClientRect());
              }}
            >
              {selectedValue}
            </div>
            <DotMenuDialog
              selectedValue={selectedValue}
              menuCoordinates={menuCoordinates}
              open={open}
              onClose={handleClose}
            />
          </div>

          <div className={pageStyle.create_platter_container}>
            <Button
              onClick={props.createPlatter}
              color="primary"
              variant="contained"
            >
              +
            </Button>
          </div>
        </div>
      </Toolbar>
    </AppBar>
  );
=======
        <Switch
          checked={props.editable}
          onChange={() => props.setEditable(!props.editable)}
          name="collection-mode"
        />
        <Typography>{props.collection.title}</Typography>
        <SearchPlatter
          collectionTitle={props.collection.title}
          platterSummaries={props.platters}
        />
        <select name="sortType" onChange={handleChange} value={props.sortType}>
          <option value={SortType.RECENTLY_ASC}>시간 순</option>
          <option value={SortType.RECENTLY_DESC}>최신 순</option>
        </select>
        {props.editable && (
          <Button
            onClick={props.createPlatter}
            color="primary"
            variant="contained"
          >
            +
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}