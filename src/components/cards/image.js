import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Image } from "../image";

const ImageCard = ({ image, width }) => (
    <div>
        <Link to={"/i/" + image.id} className="relative">
            <Image
                pixel_xd={image.metadata.pixel_xd}
                pixel_yd={image.metadata.pixel_yd}
                url={image.src_links.medium}
                className={"bg-center cover br2 shadow-5 " + width}
            />
        </Link>
    </div>
);

ImageCard.propTypes = {
    image: PropTypes.shape({
        id: PropTypes.string.isRequired,
        src_links: PropTypes.object,
        colors: PropTypes.array.isRequired,
        permalink: PropTypes.string.isRequired,
        metadata: PropTypes.shape({
            location: PropTypes.shape({
                X: PropTypes.number,
                Y: PropTypes.number
            }),
            capture_time: PropTypes.string
        }),
        user: PropTypes.shape({
            permalink: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired
        })
    }).isRequired,
    width: PropTypes.string
};

ImageCard.defaultProps = {
    width: "w-100"
};

export { ImageCard };
