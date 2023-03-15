import './Pin.css';

export default function Pin() {
    // const pinnedSuggestions = useSelector(state => state.pinnedSuggestions); to add later

    return (
        <div className="pinned-suggestions-container">
            <h1>These are your pinned suggestions</h1>
            {
                // pinnedSuggestions.map(suggestion =>
                //     <PinnedSuggestionsIndexItem suggestion={suggestion} />
                // )

            }
        </div>
    )
}