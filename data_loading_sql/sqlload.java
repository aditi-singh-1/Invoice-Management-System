package hrcjavasql;

import java.sql.Connection;
import java.sql.Date;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.sql.Types;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;


public class sqlload {
	
	  static final String JDBC_DRIVER = "com.mysql.cj.jdbc.Driver";
	  static final String DB_URL = "jdbc:mysql://localhost/h2h_internship";
	
	  static final String USER = "root";
	  static final String PASS = "new_password";
	  static Connection conn = null;
	  static PreparedStatement pstmt = null;
	  
	  
	  private static boolean isValueNull(Object obj)
		{
			if(obj == null)
				return true;
			return false;
		} //to check if the given object was null or not
		

		  public static Date date_Formate_converter(String s) throws ParseException {
			  SimpleDateFormat formatOfDate = new SimpleDateFormat("yyyyMMdd");
		        java.util.Date parsed =  formatOfDate.parse(s);
		        java.sql.Date changedDate = new java.sql.Date(parsed.getTime());
		        return changedDate;
		  } // to change the date with yyyyMMdd format
		  
	  public static void main(String[] args)throws SQLException {
	  
	  int batchSize = 1000;
	  
	  int count=0;
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
			conn = DriverManager.getConnection(DB_URL,USER,PASS);
			conn.setAutoCommit(false);
			
			String sql = "INSERT INTO invoice_details (`business_code`,`cust_number`, `name_customer`, `clear_date`, `business_year`,`doc_id`,"
					+ " `posting_date`,`document_create_date`,`due_in_date`,`invoice_currency` ,`document_type`,`posting_id` ,"
					+ " `area_business`,`total_open_amount`, `baseline_create_date`,`cust_payment_terms`,`invoice_id`, `isOpen`)"
					+ "VALUES (?, ?, ?, ?, ?,?, ?, ?, ?,?, ?, ?, ?, ?,?, ?, ?, ?)"; //sql query to insert
		
			csvread resultobj = new csvread(); //here we have an object of read CSV class
			ArrayList<invoicePojo> ResultArr = resultobj.readCSV(); // storing the result in the arraylist
			
			
			for(invoicePojo iterobj : ResultArr) {
				// using prepared statement to execute the query for every column
				 pstmt = conn.prepareStatement(sql);  
				
				if(isValueNull(iterobj.getBusiness_code()))
					pstmt.setNull(1, Types.NULL); // if value is null then store NULL
				else
					pstmt.setString(1,iterobj.getBusiness_code()); //else get the value from pojo file
				
				if(isValueNull(iterobj.getCust_number()))
					pstmt.setNull(2, Types.NULL);
				else
					pstmt.setString(2,iterobj.getCust_number());
				
				if(isValueNull(iterobj.getName_customer()))
					pstmt.setNull(3, Types.NULL);
				else
					pstmt.setString(3,iterobj.getName_customer());
				
				if(isValueNull(iterobj.getClear_date()))
					pstmt.setNull(4, Types.NULL);
				else
					pstmt.setTimestamp(4,Timestamp.valueOf(iterobj.getClear_date()));
				
				if(isValueNull(iterobj.getBusiness_year()))
					pstmt.setNull(5, Types.NULL);
				else
				{
					pstmt.setShort(5,(Short.parseShort(iterobj.getBusiness_year().replace(".0", "")))); //changing from float to short
				}
				
				if(isValueNull(iterobj.getDoc_id()))
					pstmt.setNull(6, Types.NULL);
				else {
					pstmt.setLong(6,iterobj.getDoc_id());
				}
				
				if(isValueNull(iterobj.getPosting_date()))
					pstmt.setNull(7, Types.NULL);
				else {
					pstmt.setDate(7,Date.valueOf(iterobj.getPosting_date()));
				}
				
				if(isValueNull(iterobj.getDocument_create_date1()))
					pstmt.setNull(8, Types.NULL);
				else
				{
					try {
						pstmt.setDate(8, date_Formate_converter(iterobj.getDocument_create_date1())); // calling the date converter method for specific date format
					} catch (ParseException e) {
						e.printStackTrace();
					}
				}	
				
				if(isValueNull(iterobj.getDue_in_date()))
					pstmt.setNull(9, Types.NULL);
				else
					try {
						pstmt.setDate(9, date_Formate_converter(iterobj.getDue_in_date().replace(".0", "")));
					} catch (ParseException e) {
						e.printStackTrace();
					}
				
				if(isValueNull(iterobj.getInvoice_currency()))
					pstmt.setNull(10, Types.NULL);
				else
					pstmt.setString(10,iterobj.getInvoice_currency());
				
				if(isValueNull(iterobj.getDocument_type()))
					pstmt.setNull(11, Types.NULL);
				else
					pstmt.setString(11,iterobj.getDocument_type());
				
				if(isValueNull(iterobj.getPosting_id()))
					pstmt.setNull(12, Types.NULL);
				else
					pstmt.setByte(12,iterobj.getPosting_id());
				
				if(isValueNull(iterobj.getArea_business()))
					pstmt.setNull(13, Types.NULL);
				else
					pstmt.setString(13,iterobj.getArea_business());
				
				if(isValueNull(iterobj.getTotal_open_amount()))
					pstmt.setNull(14, Types.NULL);
				else
					pstmt.setDouble(14,iterobj.getTotal_open_amount());
				
				if(isValueNull(iterobj.getBaseline_create_date()))
					pstmt.setNull(15, Types.NULL);
				else
					try {
						pstmt.setDate(15, date_Formate_converter(iterobj.getBaseline_create_date().replace(".0", "")));
					} catch (ParseException e) {
						e.printStackTrace();
					}
				
				if(isValueNull(iterobj.getCust_payment_terms()))
					pstmt.setNull(16, Types.NULL);
				else
					pstmt.setString(16,iterobj.getCust_payment_terms());
				
				if(isValueNull(iterobj.getInvoice_id()))
					pstmt.setNull(17, Types.NULL);
				else
				{
					pstmt.setLong(17,iterobj.getInvoice_id());
				}
				
				if(isValueNull(iterobj.getIsOpen()))
					pstmt.setNull(18, Types.NULL);
				else
					pstmt.setByte(18,iterobj.getIsOpen());
				
				pstmt.addBatch();  // storing the batches until it reaches the batch size
				if(count % batchSize ==0) {
					pstmt.executeBatch(); // after the batch size is full, execute it
				}
				}
			 pstmt.executeBatch(); // when loop is terminated, execute the rest of the batches
	         conn.commit();
	         conn.close();
			 }	
		catch(SQLException e)
		{
			e.printStackTrace();
		} 
		catch (ClassNotFoundException e) 
		{
			e.printStackTrace();
		}
		finally
		{
			try 
			{
				conn.close();
			} 
			catch (SQLException e) 
			{
				e.printStackTrace();
			}
			System.out.println(" Insertion of Records Completed !");
		}
	}
}

