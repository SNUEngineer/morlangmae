import React, { useState, Fragment } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import InputBase from '@material-ui/core/InputBase';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { CollectionDetail } from '../../services/collection.service';
import { UserView } from '../../services/user.service';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '60%',
    },
    backButton: {
      marginRight: theme.spacing(1),
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  }),
);

function getSteps() {
  return ['표지', '정보', '본문'];
}

const contentStyles = makeStyles((theme: Theme) =>
  createStyles({
    imageCard: {
      width: '100%',
      paddingBottom: '56.25%',
      backgroundImage: (props: any) => `url('${props.imageUrl}')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
    }
  })
)

function getStepContent(stepIndex: number, collection: any, setCollection: any, props: EditCollectionPageProps) {
  const classes = contentStyles(collection)

  const handleChange = (e: any) => {
    const name = e.target.name
    const value = e.target.value

    setCollection({
      ...collection,
      [name]: value
    })
  }

  const handleDrop = async (e: any) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.dataTransfer.files.length !== 1) {
      console.error("Unexpected file number", e.dataTransfer.files)
    } else {
      const res = await props.uploadImage(e.dataTransfer.files[0])
      setCollection({
        ...collection,
        imageUrl: res.uri
      })
    }
  }

  const handleDragOver = (e: any) => {
    e.preventDefault()
  }

  switch (stepIndex) {
    case 0:
      return (
        <Paper>
          <select name="collectionType" onChange={handleChange} value={collection.collectionType}>
            <option value="PROJECT">Project</option>
            <option value="TEAM">Team</option>
          </select>
          <select name="serviceType" onChange={handleChange} value={collection.serviceType}>
            {props.serviceTypes.map(serviceType => {
              return (
                <option key={serviceType} value={serviceType}>{serviceType}</option>
              )
            })}
          </select>
          <Card onDragOver={handleDragOver} onDrop={handleDrop} className={classes.imageCard}>
            <CardHeader title={collection.title} style={{ color: 'white' }} />
          </Card>
          <TextField variant="outlined" name="title" onChange={handleChange} value={collection.title} />
          <TextField variant="outlined" type="datetime-local" name="startDate" onChange={handleChange} value={collection.startDate} />
          <TextField variant="outlined" type="datetime-local" name="endDate" onChange={handleChange} value={collection.endDate} />
        </Paper>
      )
    case 1:
      return (
        <Paper>
          <Grid container spacing={1}>
            <Grid item xs>
              <Autocomplete
                id="users-search"
                style={{ width: 300 }}
                multiple
                value={collection.members}
                onChange={(event, newValue) => {
                  setCollection({
                    ...collection,
                    members: newValue
                  })
                }}
                options={props.users}
                renderInput={(params) => {
                  return (
                    <InputBase
                      ref={params.InputProps.ref}
                      inputProps={params.inputProps}
                      autoFocus
                    />
                  )
                }}
                getOptionLabel={(option) => option.displayName}
                renderOption={(option: UserView) => (
                  <Fragment>
                    <Avatar alt={option.displayName} src={option.imageUrl} />
                    <Typography>{option.displayName}</Typography>
                  </Fragment>
                )}
              />
              Attended User
              {collection.members.map((user: UserView) => (
                <div key={user.id}>
                  {user.displayName}
                  <Button onClick={() => {
                    setCollection({
                      ...collection,
                      members: collection.members.filter((it: UserView) => it.id !== user.id)
                    })
                  }}>
                    X
                    </Button>
                </div>
              ))}
            </Grid>
            <Grid item xs>
              <Card className={classes.imageCard}>
                <CardHeader title={collection.title} style={{ color: 'white' }} />
              </Card>
            </Grid>
          </Grid>
        </Paper>
      )
    case 2:
      return (
        <Paper>
          <Grid container spacing={1}>
            <Grid item xs>
              <Typography variant="h3">{collection.title}</Typography>
              <Typography>{collection.collectionType}</Typography>
              <Typography>{collection.serviceType}</Typography>
              <Typography>Attendence</Typography>
              {collection.members.map((user: UserView) => (
                <div key={user.id}>
                  {user.displayName}
                </div>
              ))}
            </Grid>
            <Grid item xs>
              <Card className={classes.imageCard}>
                <CardHeader style={{ color: 'white' }} title={collection.title} />
              </Card>
            </Grid>
          </Grid>
        </Paper>
      )
    default:
      return 'Unknown stepIndex';
  }
}

export interface EditCollectionPageProps {
  collectionDetail: CollectionDetail;
  users: UserView[]
  uploadImage(file: File): Promise<{ uri: string }>;
  editCollection(collection: any): Promise<void>;
  serviceTypes: string[];
}

export default function EditCollectionPage(props: EditCollectionPageProps) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();
  const collectionDetail = props.collectionDetail;
  const [collection, setCollection] = useState({
    id: collectionDetail.id,
    collectionType: collectionDetail.collectionType,
    serviceType: collectionDetail.serviceType,
    imageUrl: collectionDetail.imageUrl,
    title: collectionDetail.title,
    starDate: collectionDetail.startDate,
    endDate: collectionDetail.endDate,
    members: collectionDetail.members.map((member: UserView) => {
      return props.users.find((user: UserView) => user.id === member.id)
    }),
  })

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleStepClick = (index: number) => {
    setActiveStep(index);
  }

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => (
          <Step key={label} onClick={() => handleStepClick(index)}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        <div>
          {getStepContent(activeStep, collection, setCollection, props)}
          <div>
            {activeStep === steps.length - 1 ? (
              <Button variant="contained" color="primary" onClick={() => props.editCollection(collection)}>
                Finish
              </Button>
            ) : (
                <Button variant="contained" color="primary" onClick={handleNext}>
                  Next
                </Button>
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
}
