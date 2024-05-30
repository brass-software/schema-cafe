import Field from "./Field";

export default interface Type {
    IsScalar?:  boolean;
	Kind?:      string;
	IsPointer?: boolean;
	IsArray?:   boolean;
	IsMap?:     boolean;
	ElemType?:  Type;
	IsStruct?:  boolean;
	Fields?:    Field[];
	Methods?:   {[key: string]:Function};
	Default?:   string;
}
