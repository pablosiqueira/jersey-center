import ListPagination from "./ListPagination";
import ListSort from "./ListSort";
import Window from "../Window/Window";
import CardGrid from "../Cards/CardGrid";
import Head from "next/head";
import { useRouter } from "next/router";
import SearchBar from "../TopBar/SearchBar";
import CustomCover from "./CustomCover";
import LoadingScreen from "../UI/LoadingScreen";
import Container from "react-bootstrap/Container";

const ItemsList = props => {
    const router = useRouter()
    let title = props.search ? ('Searching `'+ props.search + '` in ' + props.category) : ('All ' + props.category)
    const capitalize = (mySentence) => {
        const words = mySentence.split(' ')
        words.map((item,index) => {return words[index] = item[0].toUpperCase() + item.substr(1)})
        return words.join(' ')
    }

    return(
        <>
        <Head>
            <title>{props.mode === 'custom' ? capitalize(props.name) : capitalize(title)}</title>
            {props.mode === 'custom' && <link rel="icon" type="image/png" sizes="8x8" href={props.image}></link>}
        </Head>
        <Window mode={props.mode}>
            {(props.mode !== 'custom' && props.mode !== 'edit') && <h1 className="text-capitalize text-center my-4">{title}</h1>}
            {props.mode === 'custom' && <CustomCover  category={router.query.category} image={props.image} name={props.name} fullName={props.item.fullName} background={props.item.background}/>}
            {props.mode === 'edit' && <h1 className="text-capitalize text-center mt-4">Search in {capitalize(props.category)}</h1>}
            
            {props.mode !== 'custom' && <Container><div className="mb-4">
                <SearchBar category={props.category} mode='list'/>
            </div></Container>}

            {(!router.isFallback && props.items.length > 0) && <>
            <ListSort category={props.category} size={props.itemsSize} filterData={props.filterData} mode={props.mode}/>
            <CardGrid mode={props.mode} items={props.items} category={props.category}/>
            <ListPagination total={props.itemsSize} category={props.category} perPage={props.perPage}/></>}

            {(!router.isFallback && props.items.length) === 0 && 
            <h5 className="text-center">No results found</h5>
            }

            {router.isFallback && 
            <LoadingScreen />
            }

        </Window>  
        </>
    )
}

export default ItemsList