import './Listing.css'

function ListingItem ({ link, imageName, name }) {
    return (
        <a href={link} target='_blank'>
            <div className="listingItem">
                <img src={`/images/${imageName}`} alt="" />
                <p>{name}</p>
            </div>
        </a>
    )
}

export default ListingItem;