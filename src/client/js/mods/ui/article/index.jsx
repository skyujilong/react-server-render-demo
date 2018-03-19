import React, {
    Component
} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { getArticle } from '../../data/action';
import './scss/index.scss';
class Article extends Component {
    constructor(props) {
        super(props);

    }
    render() {
        let { article } = this.props;
        return (
            <div className={'article'} style={this.props.style}>
                {article ? <div dangerouslySetInnerHTML={{ __html: article }}></div> : 'loading....'}
            </div>
        );
    }
    componentDidMount() {
        let { getArticle } = this.props;
        getArticle();
    }
}

function mapStateToProps(state) {
    let { article } = state;
    return {
        article: article
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getArticle: function () {
            //dispatch action
            dispatch(getArticle());
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Article));