package hrcjavasql;

import java.io.BufferedReader;
import java.io.FileReader;
import java.util.ArrayList;

public class csvread {
	  
	static String filepath = "C:\\program1\\practise1806095.csv"; //add the csv file
	
	public ArrayList<invoicePojo> readCSV() //method to read csv
	{	
	ArrayList<invoicePojo> record = new ArrayList<>(); //to store the whole csv records
	
	try {
		BufferedReader lineReader = new BufferedReader(new FileReader(filepath));
		ArrayList<String> storeRows = new ArrayList<>();
		String store = null;
		
		lineReader.readLine(); //we don't need the column name row 
		//to find the size of the storeRows Arraylist
	    while((store=lineReader.readLine()) !=null) {
	    	storeRows.add(store);//finding out the  no of rows of csv
	    }
	    
		for(int i=0;i<storeRows.size();i++) { 
			String[] eachValue = storeRows.get(i).split(","); // the comma separated values are detected and kept in this array variable
			invoicePojo obj = new invoicePojo();
			//checking the null values and reading the values for every column
			if(eachValue[0].equals("")){
				obj.setBusiness_code(null);
			}
			else {
				obj.setBusiness_code(eachValue[0]);
			}
			
			if(eachValue[1].equals("")){
				obj.setCust_number(null);
			}
			else {
				obj.setCust_number(eachValue[1]);
			}
			
			if(eachValue[2].equals("")){
				obj.setName_customer(null);
			}
			else {
				obj.setName_customer(eachValue[2]);
			}
			
			if(eachValue[3].equals("")){
				obj.setClear_date(null);
			}
			else {
				obj.setClear_date(eachValue[3]);
			}
			
			if(eachValue[4].equals("")){
				obj.setBusiness_year(null);
			}
			else {
				obj.setBusiness_year((eachValue[4]));
			}
			
			if(eachValue[5].equals("")){
				obj.setDoc_id(null);
			}
			else {
				obj.setDoc_id(Long.parseLong(eachValue[5].replace(".0", "")));// changing the float value to long
			}
			
			if(eachValue[6].equals("")){
				obj.setPosting_date(null);
			}else {
				obj.setPosting_date(eachValue[6]);
			}
			
			if(eachValue[7].equals("")){
				obj.setDocument_create_date(null);
			}else {
				obj.setDocument_create_date(eachValue[7]);
			}
			
			if(eachValue[8].equals("")){
				obj.setDocument_create_date1(null);
			}else {
				obj.setDocument_create_date1(eachValue[8]);
			}
			
			if(eachValue[9].equals("")){
				obj.setDue_in_date(null);
			}else {
				obj.setDue_in_date(eachValue[9]);
			}
			
			if(eachValue[10].equals("")){
				obj.setInvoice_currency(null);
			}else {
				obj.setInvoice_currency(eachValue[10]);
			}
			
			if(eachValue[11].equals("")){
				obj.setDocument_type(null);
			}else {
				obj.setDocument_type(eachValue[11]);
			}
			
			if(eachValue[12].equals("")){
				obj.setPosting_id(null);
			}else {
				obj.setPosting_id(Byte.parseByte((eachValue[12].replace(".0", ""))));
			}
			
			if(eachValue[13].equals("")){
				obj.setArea_business(null);
			}else {
				obj.setArea_business(eachValue[13]);
			}
			
			if(eachValue[14].equals("")){
				obj.setTotal_open_amount(null);
			}else {
				obj.setTotal_open_amount(Double.parseDouble(eachValue[14]));
			}
			
			if(eachValue[15].equals("")){
				obj.setBaseline_create_date(null);
			}else {
				obj.setBaseline_create_date(eachValue[15]);
			}
			
			if(eachValue[16].equals("")){
				obj.setCust_payment_terms(null);
			}else {
				obj.setCust_payment_terms(eachValue[16]);
			}
			
			if(eachValue[17].equals("")){
				obj.setInvoice_id(null);
			}else {
				obj.setInvoice_id(Long.parseLong(eachValue[17].replace(".0", "")));
			}
			
			if(eachValue[18].equals("")){
				obj.setIsOpen(null);
			}else {
				obj.setIsOpen(Byte.parseByte(eachValue[18]));
			}
			record.add(obj); // keep adding the rows
	}
	lineReader.close();
}
catch(Exception e) {
	e.printStackTrace();
}
return record; // return all the csv records
}
}

