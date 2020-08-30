import { GamerAttending } from 'services/eventService';
import React from 'react';
import { DragDropContext, Droppable, Draggable, DragResult } from 'react-beautiful-dnd';
import { Card, Typography } from '@material-ui/core';
import { Attendee } from 'ui/components/attendees/Attendee';
import Grid from '@material-ui/core/Grid';
import styles from 'ui/components/adminEvents/EditableAttendeeLists.module.css';


interface IProps {
  attendees: GamerAttending[],

  onEdit(attendeeId: number, isAttending: boolean): void;
}

export function EditableAttendeeLists(props: IProps) {

  const getListStyle = isDraggingOver => ({
    padding: '8px',
    margin: '8px',
    minWidth: '400px',
    minHeight: '200px',
    background: isDraggingOver ? 'lightblue' : 'white',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'primary',
  });

  const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',

    // styles we need to apply on draggables
    ...draggableStyle,
  });

  const onDragEnd = (result: DragResult) => {
    const {source, destination} = result;

    // dropped outside the list
    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      return;
    } else {
      if (destination.droppableId === "attending") {
        props.onEdit(result.draggableId, true)
      } else if (destination.droppableId === "notAttending") {
        props.onEdit(result.draggableId, false)
      }
    }
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Grid container={true} direction={'row'}>
        <Grid item={true}>
          <Typography variant={'h6'} className={styles.withMargin}>
            Attending
          </Typography>
          <Droppable droppableId="attending">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}>
                <Grid container={true} spacing={1} direction='column'>
                  {props.attendees
                    .filter((gamer) =>
                              gamer.attending === true,
                    ).map((item, index) => (
                      <Grid item={true}>
                        <Draggable
                          key={item.id}
                          draggableId={item.id}
                          index={index}>
                          {(provided, snapshot) => (
                            <Card
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={getItemStyle(
                                snapshot.isDragging,
                                provided.draggableProps.style,
                              )}>
                              <Attendee attendee={item} highlighted={false}/>
                            </Card>
                          )}
                        </Draggable>
                      </Grid>
                    ))}
                </Grid>
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </Grid>
        <Grid item={true}>
          <Typography variant={'h6'} className={styles.withMargin}>
            Not Attending
          </Typography>
          <Droppable droppableId="notAttending">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}>
                <Grid container={true} spacing={1} direction='column'>
                  {props.attendees
                    .filter((gamer) =>
                              gamer.attending === false,
                    )
                    .map((item, index) => (
                      <Grid item={true}>
                        <Draggable
                          key={item.id}
                          draggableId={item.id}
                          index={index}>
                          {(provided, snapshot) => (
                            <Card
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={getItemStyle(
                                snapshot.isDragging,
                                provided.draggableProps.style,
                              )}>
                              <Attendee attendee={item} highlighted={false}/>
                            </Card>
                          )}
                        </Draggable>
                      </Grid>
                    ))}
                </Grid>
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </Grid>
        <Grid item={true}>
          <Typography variant={'h6'} className={styles.withMargin}>
            Not Responded
          </Typography>
          <Droppable droppableId="notResponded" isDropDisabled="true">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                style={getListStyle(false)}>
                <Grid container={true} spacing={1} direction='column'>
                  {props.attendees
                    .filter((gamer) =>
                              gamer.attending === undefined || gamer.attending === null,
                    )
                    .map((item, index) => (
                      <Grid item={true}>
                        <Draggable
                          key={item.id}
                          draggableId={item.id}
                          index={index}>
                          {(provided, snapshot) => (
                            <Card
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={getItemStyle(
                                snapshot.isDragging,
                                provided.draggableProps.style,
                              )}>
                              <Attendee attendee={item} highlighted={false}/>
                            </Card>
                          )}
                        </Draggable>
                      </Grid>
                    ))}
                </Grid>
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </Grid>
      </Grid>
    </DragDropContext>
  )
}
