import { useEffect, useState } from "react";
import { useGetSuggestionsQuery } from "../../slices/suggestionSlice";
import { Link } from "react-router-dom";

export const ArticleSuggestions = ({ articleId, language }) => {
    const [suggestions, setSuggestions] = useState([]);
    const [latestArticles, setLatestArticles] = useState([]);

    const { data, error, isLoading } = useGetSuggestionsQuery(articleId);

    useEffect(() => {
        if (data) {
            setLatestArticles(data.latestArticles);
            setSuggestions(data.suggestions);
        } else if (error) {
            console.log("Error:", error);
        }
    }, [data, error]);

    return (
        <div>
            {suggestions.map((s,i) => (
                <ul>
                <Link key={i} to={`/affair/${s._id}`}>{language === 'Hindi' ? (s.affairName.hi || s.affairName) : (s.affairName.en || s.affairName)}
</Link>
    </ul>            ))}
            {latestArticles.map((s,i) => (
                <ul>
                <Link key={i} to={`/affair/${s._id}`}>{language === 'Hindi' ? (s.affairName.hi || s.affairName) : (s.affairName.en || s.affairName)}
</Link>
                </ul>

            ))}
        </div>
    );
};
