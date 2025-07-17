import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface SearchInput {
    name: string;
    type: string;
    text: string;
    value: string | number;
    placeholder?: string;
}

interface Props {
    searchInputs: SearchInput[];
    handleChange: (
        event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => void;
}

export const SearchBar: React.FC<Props> = ({ searchInputs, handleChange }) => {
    return (
        <Card className="bg-muted rounded-r-none rounded-t-none">
            <CardHeader>
                <CardTitle>Buscar por:</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex gap-6 justify-center">
                    {searchInputs.map((input: SearchInput, index: number) => (
                        <div className="flex gap-4 w-full max-w-xs" key={index}>
                            <Label htmlFor={input.name}>{input.text}:</Label>
                            <Input
                                id={input.name}
                                type={input.type}
                                name={input.name}
                                value={input.value}
                                onChange={handleChange}
                                placeholder={input.placeholder}
                            />
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};
