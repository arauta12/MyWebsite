import ListingItem from './ListingItem';

function LangListing() {
    return (
        <section className="sectionInfo">
            <h3>Languages</h3>
            <div className="listing">
                <ListingItem 
                    link={'https://developer.mozilla.org/en-US/docs/Web/JavaScript'}
                    imageName={"javascript.png"}
                    name={"Javascript"}
                />
                <ListingItem 
                    link={'https://isocpp.org/'}
                    imageName={"cpp.png"}
                    name={"C/C++"}
                />
                <ListingItem
                    link={'https://www.postgresql.org/'}
                    imageName={"sql.svg"}
                    name={"SQL"}
                />
                <ListingItem
                    link={"https://www.python.org/"}
                    imageName={"python.png"}
                    name={"Python"}
                />
                <ListingItem
                    link={'https://developer.mozilla.org/en-US/docs/Web/HTML'}
                    imageName={"html.png"}
                    name={"HTML"}
                />
                <ListingItem
                    link={'https://developer.mozilla.org/en-US/docs/Web/CSS'}
                    imageName={"css.png"}
                    name={"CSS"}
                />
            </div>
        </section>
    );
}

export default LangListing;