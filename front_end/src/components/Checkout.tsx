import { Container, Grid, TextField, Select, MenuItem, FormControl, InputLabel, Button, Radio, RadioGroup, FormControlLabel, FormLabel, Typography, Box, Paper } from '@mui/material';
import { styled } from '@mui/system';

const StyledTextField = styled(TextField)({
    '& .MuiOutlinedInput-root': {
        borderRadius: 8,
    },
    '& label.Mui-focused': {
        color: '#000',
    },
    '& .MuiInputBase-input': {
        color: '#000',
    },
    '& .MuiOutlinedInput-notchedOutline': {
        borderColor: '#000',
    }
});

const StyledButton = styled(Button)({
    borderRadius: 8,
    backgroundColor: '#fff',
    color: '#000',
    border: '1px solid #000',
    '&:hover': {
        backgroundColor: '#f0f0f0',
    },
});

const StyledSelect = styled(Select)({
    '& .MuiOutlinedInput-root': {
        borderRadius: 8,
    },
    '& .MuiOutlinedInput-notchedOutline': {
        borderColor: '#000',
    },
    '& .MuiSelect-select': {
        color: '#000',
    },
    '& .MuiSvgIcon-root': {
        color: '#000',
    }
});

const StyledPaper = styled(Paper)({
    padding: 16,
    borderRadius: 8,
    border: '1px solid #ddd',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
});

const StyledTypography = styled(Typography)({
    fontWeight: 600,
});

const StyledTotalTypography = styled(Typography)({
    color: '#B88E2F', 
});

const CheckoutPage = () => {
    return (
        <Container maxWidth="lg">
            <Grid container spacing={3}>
                <Grid item xs={12} md={7}>
                    <StyledTypography variant="h4" gutterBottom>
                        Billing Details
                    </StyledTypography>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <StyledTextField required label="First Name" fullWidth />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <StyledTextField required label="Last Name" fullWidth />
                        </Grid>
                        <Grid item xs={12}>
                            <StyledTextField label="Company Name (Optional)" fullWidth />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <InputLabel>Country / Region</InputLabel>
                                <StyledSelect defaultValue="Sri Lanka">
                                    <MenuItem value="Sri Lanka">Sri Lanka</MenuItem>
                                    {/* Add more countries as needed */}
                                </StyledSelect>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <StyledTextField required label="Street address" fullWidth />
                        </Grid>
                        <Grid item xs={12}>
                            <StyledTextField required label="Town / City" fullWidth />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <InputLabel>Province</InputLabel>
                                <StyledSelect defaultValue="Western Province">
                                    <MenuItem value="Western Province">Western Province</MenuItem>
                                    {/* Add more provinces as needed */}
                                </StyledSelect>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <StyledTextField required label="ZIP code" fullWidth />
                        </Grid>
                        <Grid item xs={12}>
                            <StyledTextField required label="Phone" fullWidth />
                        </Grid>
                        <Grid item xs={12}>
                            <StyledTextField required label="Email address" fullWidth />
                        </Grid>
                        <Grid item xs={12}>
                            <StyledTextField label="Additional information" multiline rows={4} fullWidth />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={5}>
                    <StyledPaper>
                        <Box display="flex" justifyContent="space-between">
                            <Typography variant='h6'>Product</Typography>
                            <Typography variant='h6'>Subtotal</Typography>
                        </Box>
                        <Box display="flex" justifyContent="space-between">
                            <Typography>Asgaard sofa x 1</Typography>
                            <Typography>250.00</Typography>
                        </Box>
                        <Box display="flex" justifyContent="space-between" fontWeight="bold">
                            <Typography>Subtotal</Typography>
                            <Typography>250.00</Typography>
                        </Box>
                        <Box display="flex" justifyContent="space-between" fontWeight="bold">
                            <Typography>Total</Typography>
                            <StyledTotalTypography variant="h5">250.00</StyledTotalTypography>
                        </Box>
                        <hr />
                        <FormControl component="fieldset" margin="normal">
                            <FormLabel component="legend">Payment Method</FormLabel>
                            <RadioGroup defaultValue="bank">
                                <FormControlLabel value="bank" control={<Radio />} label="Direct Bank Transfer" />
                                <Typography variant="body2" color="textSecondary">
                                    Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.
                                </Typography>
                                <FormControlLabel value="cod" control={<Radio />} label="Cash On Delivery" />
                            </RadioGroup>
                        </FormControl>
                        <StyledButton variant="contained" fullWidth>
                            Place order
                        </StyledButton>
                    </StyledPaper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default CheckoutPage;
