import React from 'react';
import { useRouteMatch } from 'react-router-dom';

type RouteParams = {
    id: string
}

const Article = () => {
    const match = useRouteMatch<RouteParams>();

    return <div>
        Article {match.params.id}
    </div>
}

export default Article;
