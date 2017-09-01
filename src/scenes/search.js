import React, {Component} from 'react'
import {SearchImages} from '../services/api/api'
import {LinearCollection} from "../components/collection"
import {bindAll} from 'lodash'
import {NoResults} from '../components/error'

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [],
            q: ''
        };
        bindAll(this, 'handleColorChange', 'handleTextChange', 'loadImages');
    }

    handleColorChange(color, event) {
        this.setState({
            hex: color.hex.slice(1),
            images: []
        });
    }

    handleTextChange(e) {
        this.setState({
            q: e.target.value,
            images: []
        });
    }

    loadImages() {
        const q = this.state.q;

        if (q === '')
            return;

        let querybody = {
            required_terms: q.split(' ').map(t => t.trim()),
            document_types: ['image']
        };

        console.log(querybody);

        let t = this;
        SearchImages('/search', querybody)
            .then(function (data) {
                console.log(data);
                t.setState({
                    images: data.images
                })
            })
            .catch((err) => console.log(err));
    }

    render() {
        return (
            <div>
                <div className="sans-serif mw7 pa5 pb6 ma2 tc br2 center">
                    <input
                        className="f6 f5-l input-reset bn fl white bg-black-70 pa3 lh-solid w-100 w-75-m w-80-l br2-ns br--left-ns ba b--black-70"
                        type="text"
                        onChange={this.handleTextChange}/>
                    <span onClick={this.loadImages}
                          className="f6 f5-l button-reset fl pv3 tc bn bg-animate bg-black-80 hover-bg-black white pointer w-100 w-25-m w-20-l br2-ns br--right-ns">
                                Search
                    </span>
                </div>
                {this.state.images.length === 0 ? <NoResults/> :
                <LinearCollection images={this.state.images} isSummary={true}/> }
            </div>
        )
    }
}

export {Search};