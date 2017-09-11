import React, {Component} from 'react'
import {Patch} from "../../../services/api/patch";
import PropTypes from 'prop-types'
import {bindAll} from 'lodash'
import './collapse.css'
import {TextField} from "../../../components/fields";
import {Tabs, TabList, TabPanel, Tab} from 'react-tabs'
import 'react-tabs/style/react-tabs.css';

class ManageImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: props.image,
            iso: props.image.metadata.iso,
            aperture: props.image.metadata.aperture,
            exposure_time: props.image.metadata.exposure_time,
            focal_length: props.image.metadata.focal_length,

            model: props.image.metadata.model,
            make: props.image.metadata.make,
            lens_model: props.image.metadata.lens_model,
            lens_make: props.image.metadata.lens_make,

        };

        bindAll(this, 'handleChange', 'commitChanges')
    }

    handleChange(e) {
        const target = e.target;
        const name = target.name;

        console.log(name, target.value);
        this.setState({
            [name]: target.value
        })
    }

    commitChanges(e) {
        e.preventDefault();
        Patch(this.state.image.id, 'images', {
            'aperture': Number(this.state.aperture),
            'iso': Number(this.state.iso),
            'exposure_time': this.state.exposure_time,
            'focal_length': Number(this.state.focal_length),

            'make': this.state.make,
            'model': this.state.model,
            'lens_make': this.state.lens_make,
            'lens_model': this.state.lens_model,
        });
    }

    render() {
        return (
            <div className="sans-serif dib pv3 mv4 w-100">
                <div className="dib tc">
                    <img src={this.state.image.src_links.medium} alt=""
                         className="w-20"/>
                </div>
                <Tabs>
                    <TabList>
                        <Tab>Image Metadata</Tab>
                        <Tab>Camera</Tab>
                    </TabList>
                    <TabPanel>
                        <div className="fl ph2 pr0-ns pl3-ns w-80 dib">
                            <form onSubmit={this.commitChanges}>
                                <TextField handleChange={this.handleChange} name="aperture" val={this.state.aperture}
                                           desc="Your name will be displayed alongside your username." optional={true}/>

                                <TextField handleChange={this.handleChange} name="iso" presentation_name={"ISO"} val={this.state.iso}
                                           desc="Your location will appear on your profile and be available for searches."
                                           optional={true}/>

                                <TextField handleChange={this.handleChange} name="exposure_time" presentation_name={"Exposure Time"} val={this.state.exposure_time}
                                           desc="The portfolio link is present on your profile page." optional={true}/>

                                <TextField handleChange={this.handleChange} name="focal_length" presentation_name={"Focal Length"} val={this.state.focal_length}
                                           desc="Adding your Instagram allows us to feature you on Instagram." optional={true}/>


                                <div className="mt3">
                                    <input className="b ph3 pv2 input-reset ba b--black bg-transparent pointer f6" type="Submit"
                                           value="Submit"/>
                                </div>
                            </form>
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className="fl ph2 pr0-ns pl3-ns w-80 dib">
                            <form onSubmit={this.commitChanges}>
                                <TextField handleChange={this.handleChange} name="make" val={this.state.make}
                                           desc="Your name will be displayed alongside your username." optional={true}/>

                                <TextField handleChange={this.handleChange} name="model"  val={this.state.model}
                                           desc="Your location will appear on your profile and be available for searches."
                                           optional={true}/>

                                <TextField handleChange={this.handleChange} name="lens_make" presentation_name={"Lens Make"} val={this.state.lens_make}
                                           desc="The portfolio link is present on your profile page." optional={true}/>

                                <TextField handleChange={this.handleChange} name="lens_model" presentation_name={"Lens Model"} val={this.state.lens_model}
                                           desc="Adding your Instagram allows us to feature you on Instagram." optional={true}/>


                                <div className="mt3">
                                    <input className="b ph3 pv2 input-reset ba b--black bg-transparent pointer f6" type="Submit"
                                           value="Submit"/>
                                </div>
                            </form>
                        </div>
                    </TabPanel>

                </Tabs>



            </div>
        )
    }
}

ManageImage.propTypes = {
    image: PropTypes.object.isRequired
};


const ManageImages = ({images}) =>
    <div>
        {images.map(i=> <ManageImage key={i.id} image={i}/>)}
    </div>;
ManageImages.propTypes = {
    images: PropTypes.array.isRequired
};

    export {ManageImages};