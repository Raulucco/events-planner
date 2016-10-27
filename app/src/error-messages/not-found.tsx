import * as React from 'react';

export class NotFound extends React.Component<{}, any> {
    public render() {
        return (<div className="error not-found">
            <h1>Not found</h1>
            <p>Error ...</p>
        </div>);
    }
}
