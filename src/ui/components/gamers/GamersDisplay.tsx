import * as React from 'react';
import {
  Button,
  Card, Fab,
  Grid, Typography,
} from '@material-ui/core';
import styles from 'ui/components/groups/GroupsDisplay.module.css';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { Gamer } from 'services/eventService';


interface IProps {
  gamers: Gamer[];

  onEdit(gamerId: number): () => void;

  onCreate(): void;

  onDelete(gamerId: number): () => void;
}

export class GamersDisplay extends React.Component<IProps> {

  createGamerGrid = (gamer: Gamer) => {
    return (
      <Card className={styles.groupCard} key={`night-${gamer.id}`}>
        <Grid container={true} direction={'column'}>
          <Grid container={true} justify={'space-between'}>
            <Grid item={true}>
              <Typography variant={'h6'}>
                {gamer.name} ({gamer.email})
              </Typography>
            </Grid>
            <Grid item={true}>
              <Grid container={true}>
                <Grid item={true} className={styles.fab}>
                  <Fab color="primary" size={'small'} aria-label="edit"
                       onClick={this.props.onEdit(gamer.id)}>
                    <EditIcon/>
                  </Fab>
                </Grid>
                <Grid item={true} className={styles.fab}>
                  <Fab color="secondary" size={'small'} aria-label="edit"
                       onClick={this.props.onDelete(gamer.id)}>
                    <DeleteIcon/>
                  </Fab>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Card>
    )
  }

  render() {
    return (
      <Grid container={true} className={styles.root} direction={'column'}>
        <Grid item={true}>
          {this.props.gamers.sort((a, b) => a.name > b.name ? 1 : -1).map(this.createGamerGrid)}
        </Grid>
        <Grid item={true} className={styles.createButtonGrid}>
          <Button onClick={this.props.onCreate} variant={'outlined'} color={'secondary'}
                  className={styles.createButton}>
            Create Gamer
          </Button>
        </Grid>
      </Grid>
    )
  }
}
