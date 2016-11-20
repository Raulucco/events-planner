import React from 'react';
import { partial } from 'lodash';
import { eventListenerDecorator } from '../event-handlers-utils';

interface Iter {
    [Symbol.iterator](): Iterator<any>;
}

export class EventForm {

   static makeForm(event: any, handlers: any) {
        return (
            <form name="event-form">
                <input type="hdden" value={event.id} />
                <div className="controls">
                    <label>
                        <span className="label">Title:</span>
                        <input type="text" id="title" name="title" placeholder="event title"
                            required autoFocus
                            ref={(input) => this.title = input}
                            onInput={handlers.onTitleInput}
                        />
                    </label>
                </div>
                <div className="controls">
                    <label>
                        <span className="label">Description:</span>
                        <textarea type="text" id="description" name="description"
                            ref={(input) => this.description = input}
                            onInput={handlers.onDescriptionInput}
                        />
                    </label>
                </div>
                <div className="controls">
                    <label>
                        <span className="label">Start:</span>
                        <input type="text" id="start" name="start" placeholder="DD/MM/YYYY"
                            ref={(input) => this.start = input}
                            onInput={handlers.onStartInput}
                        />
                    </label>
                </div>
                <div className="controls">
                    <label>
                        <span className="label">End:</span>
                        <input type="text" id="end" name="end" placeholder="DD/MM/YYYY"
                            ref={(input) => this.end = input}
                            onInput={handlers.onEndInput}
                        />
                    </label>
                </div>
                <div className="controls">
                    <label>
                        <span className="label">Location:</span>
                        <input type="text" id="location" name="location" placeholder="Santa Monica"
                            ref={(input) => this.location = input}
                            onInput={handlers.onLocationInput}
                        />
                    </label>
                </div>
                <div className="controls btn">
                    <button type="submit">Login</button>
                    <button type="reset">Reset</button>
                </div>
            </form>
        );
    }
}

export class EventMarkup extends React.Component<any, any> {
    store: any;
    edit() {
        this.store.dispatch();
    }

    delete() {
        this.store.dispatch();
    }

    render() {
        const edit = this.edit.bind(this);
        const remove = this.delete.bind(this);
        const editPressed = partial(eventListenerDecorator, edit);
        const deletePressed = partial(eventListenerDecorator, remove);

        return (
            <li className="event">
                <h3>this.props.title</h3>
                <p>this.props.description</p>
                <button onClick={edit} onKeyDown={editPressed}>Edit</button>
                <button onClick={remove} onKeyDown={deletePressed}>Delete</button>
            </li>
        );
    }
}

export class Events extends React.Component<any, any> {
    store: any;

    render() {
        return (
            <div className="events">
                <button>Create Event</button>
                <ul className="list">
                    {this.props.events.map((event: Iter) => <EventMarkup props={event} store={this.store} />)}
                </ul>
            </div>
        );
    }
}


export class CreateEvent extends React.Component<any, any> {
    render() {
        return EventForm.makeForm.call(this, this.props.event, {});
    }
}


export class EditEvent extends React.Component<any, any> {
    render() {
        return EventForm.makeForm.call(this, this.props.event, {});
    }
}
